import PropTypes from "prop-types";

function ImageCollage({ images }) {
  return (
    <div className="grid grid-rows-4 grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:gap-5 rounded-2xl overflow-hidden w-full h-full shrink-0 max-w-[1200px]">
      {images.length === 1 && (
        <div className="col-span-4 row-span-2 w-full h-full object-cover">
          <img
            src={images[0].image_url}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}
      {images.length === 2 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length === 3 && (
        <>
          <div className="col-span-2 row-span-2 border ">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length === 4 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[3].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length >= 5 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[3].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border1">
            <img
              src={images[4].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCollage;

ImageCollage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
    }),
  ),
};
