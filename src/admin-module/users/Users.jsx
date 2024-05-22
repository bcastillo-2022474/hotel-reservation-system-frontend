import Navbar from "../../shared/componnents/Navbar.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../config.js";
import { toast } from "react-toastify";
import {
  ADMIN_PLATFORM_ROLE,
  ADMIN_ROLE,
  CLIENT_ROLE,
} from "../../route-guards/PrivateClientRoute.jsx";
import Dropdown from "../../shared/componnents/Dropdown.jsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function User() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast("Error: " + error.message, { type: "error" });
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  console.log(data);
  const { users } = data;

  return (
    <div className="min-h-dvh h-1">
      <Navbar></Navbar>
      <section className="flex flex-col gap-3 py-3 px-3 h-full overflow-y-scroll mb-10">
        <h1 className="text-4xl font-bold text-center">Usuarios</h1>
        <div className="w-full grid  grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3 px-5">
          {users.map(({ x, _id, email, lastname, name, role }) => (
            <div className="flex justify-center" key={_id}>
              <div className="border border-gray-200 rounded-md grow max-w-[350px]">
                <div className="px-5 py-3 flex flex-col gap-3">
                  <span className="text-3xl font-bold text-ellipsis overflow-hidden">
                    {email}
                  </span>
                  <div className="flex gap-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-gray-700">
                        Nombre
                      </span>
                      <span>{name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-gray-700">
                        Apellido
                      </span>
                      <span>{lastname}</span>
                    </div>
                  </div>
                  {/*<div*/}
                  {/*  className={`text-xl border px-3 py-2 rounded font-bold text-center ${getColor(role)}`}*/}
                  {/*>*/}
                  {/*  {role}*/}
                  {/*</div>*/}
                  <UpdateRole id={_id} role={role} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default User;

function UpdateRole({ role: defaultRole, id }) {
  const [role, setRole] = useState(defaultRole);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (role) => {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ role }),
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      return response.json();
    },
    onSuccess: () => {
      toast("Role updated", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toast("Error: " + error.message, { type: "error" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error((await response.json()).error);
      }
      return response.json();
    },
    onSuccess: () => {
      toast("Role deleted", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toast("Error: " + error.message, { type: "error" });
    },
  });

  useEffect(() => {
    if (!updateMutation.isSuccess && !updateMutation.isError) return;
    setTimeout(() => {
      updateMutation.reset();
    }, 3000);
  }, [updateMutation.isSuccess, updateMutation.isError]);

  return (
    <div className="flex flex-col gap-1">
      <Dropdown
        options={[ADMIN_ROLE, ADMIN_PLATFORM_ROLE, CLIENT_ROLE]}
        defaultOption={role}
        onChange={(role) => {
          setRole(role);
        }}
      />
      <div className="flex gap-3">
        <button
          onClick={() => {
            // updateMutation.mutate({ role: defaultRole });
            deleteMutation.mutate();
          }}
          className="px-3 py-2 bg-black text-white rounded grow"
        >
          Eliminar
        </button>
        <button
          onClick={() => {
            if (!updateMutation.isIdle) return;
            updateMutation.mutate(role);
          }}
          className={`px-3 py-2 bg-black text-white rounded grow ${role === defaultRole && "hidden"} flex gap-2 justify-center`}
        >
          {updateMutation.isIdle && <span>Actualizar</span>}
          {updateMutation.isPending && (
            <>
              <span>Actualizando</span>
              <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
            </>
          )}
          {updateMutation.isSuccess && (
            <>
              <span>Actualizado</span>
              <FontAwesomeIcon icon={faCheck} />
            </>
          )}
          {updateMutation.isError && (
            <>
              <span>Ups hubo un problema!</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

UpdateRole.propTypes = {
  role: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
