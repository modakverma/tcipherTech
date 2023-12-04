import { useRef, useState } from 'react';
import ReactCrop, {
  ReactCropProps, 
  centerCrop,
  makeAspectCrop,
  type Crop
 } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from '../../base-components/Button';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}
const CropImage = ({logoImg,getCroppedImageFromChild,croppedLogoImg}) => {
  const imgRef = useRef<HTMLImageElement>();
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  const [completedCrop,setCompletedCrop] = useState<PixelCrop | null>(null);
  const [crop, setCrop] = useState<ReactCropProps['crop']>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      setCrop(centerAspectCrop(naturalWidth, naturalHeight, aspect));
    }
   }

  const handleCancelCroppingImage=()=>{
      getCroppedImageFromChild(croppedLogoImg,false)
  }

  async function onSaveCroppedImage() {
    const image = imgRef.current as HTMLImageElement;
    if (!image || !completedCrop || completedCrop.x <= 0 || completedCrop.y <= 0) {
      throw new Error('Invalid crop dimensions');
    }
    await new Promise((resolve) => {
      if (image.complete) {
        resolve();
      } else {
        image.onload = resolve;
      }
    });
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = document.createElement('canvas');
    offscreen.width = completedCrop.width;
    offscreen.height = completedCrop.height;
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      (completedCrop.width) * scaleX ,
      (completedCrop.height) * scaleY ,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );
    const base64Image = offscreen.toDataURL('image/jpeg');
    // here we set our cropped image to the generated canvas image (passing prop from child to parent) =>
    getCroppedImageFromChild(base64Image);
  }
  return (
   <div className='
   z-50
   flex
   w-full
   h-screen
   items-center
   justify-center
   bg-slate-900/80
   absolute
   left-0
   top-0
   '>
    <div className="z-50 
    p-4
    flex
    flex-col
    items-center
    justify-center
    overflow-hidden 
    h-fit 
    w-96
    shadow-xl
    shadow-slate-700/50
    rounded-xl 
    bg-white">
    <ReactCrop 
    crop={crop} 
    onChange={c=>{
      setCrop(c)
    }}
     onComplete={(crop)=>{
       console.log(crop.height,crop.width);
      if (crop.width > 0 && crop.height > 0) {
        setCompletedCrop(crop);
      } else {
        console.log('Invalid crop dimensionsss');
      }
    }}>
          <img 
          ref={imgRef}
          onLoad={onImageLoad} 
          className="object-contain "
          src={logoImg} 
          alt='crop-me'/>
    </ReactCrop>
    <div className='pt-4 flex gap-4 w-full justify-end'>
    <Button
      onClick={onSaveCroppedImage}
      className="text-black bg-{#FFF} shadow-lg border-sm px-6 font-normal rounded-xl">
      Save
    </Button>
    <Button
      onClick={handleCancelCroppingImage}
      className="text-white bg-[#04032D] px-6 font-normal rounded-xl">
      Cancel
    </Button>
    </div>
    </div>
   </div>
  )
}

export default CropImage