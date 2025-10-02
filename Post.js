import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// Exemple de données fictives
const posts = [
  {
    id: 1,
    user: "Alice",
    images: [
      "https://picsum.photos/id/1015/600/400",
    ],
  },
  {
    id: 2,
    user: "Bob",
    images: [
      "https://picsum.photos/id/1020/600/400",
      "https://picsum.photos/id/1024/600/400",
    ],
  },
  {
    id: 3,
    user: "Charlie",
    images: [
      "https://picsum.photos/id/1035/600/400",
      "https://picsum.photos/id/1041/600/400",
      "https://picsum.photos/id/1049/600/400",
    ],
  },
  {
    id: 4,
    user: "Diana",
    images: [
      "https://picsum.photos/id/1052/600/400",
      "https://picsum.photos/id/1060/600/400",
      "https://picsum.photos/id/1067/600/400",
      "https://picsum.photos/id/1074/600/400",
      "https://picsum.photos/id/1084/600/400",
      "https://picsum.photos/id/1094/600/400",
    ],
  },
];

function Post({ user, images }: { user: string; images: string[] }) {
  const imgCount = images.length;

  const renderGrid = () => {
    if (imgCount === 1) {
      return (
        <div className="w-full">
          <PhotoView src={images[0]}>
            <img src={images[0]} alt="" className="rounded-xl w-full object-cover" />
          </PhotoView>
        </div>
      );
    }

    if (imgCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {images.map((src, i) => (
            <PhotoView key={i} src={src}>
              <img src={src} alt="" className="rounded-xl w-full h-64 object-cover" />
            </PhotoView>
          ))}
        </div>
      );
    }

    if (imgCount === 3) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <PhotoView src={images[0]}>
            <img src={images[0]} alt="" className="rounded-xl w-full h-64 object-cover col-span-2" />
          </PhotoView>
          {images.slice(1).map((src, i) => (
            <PhotoView key={i} src={src}>
              <img src={src} alt="" className="rounded-xl w-full h-48 object-cover" />
            </PhotoView>
          ))}
        </div>
      );
    }

    if (imgCount >= 5) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {images.slice(0, 4).map((src, i) => (
            <PhotoView key={i} src={src}>
              <img src={src} alt="" className="rounded-xl w-full h-48 object-cover" />
            </PhotoView>
          ))}
          <div className="relative">
            <PhotoView src={images[4]}>
              <img src={images[4]} alt="" className="rounded-xl w-full h-48 object-cover" />
            </PhotoView>
            {imgCount > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl text-white text-xl font-semibold">
                +{imgCount - 5}
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white mb-6">
      <h3 className="font-semibold mb-3">{user}</h3>
      <PhotoProvider>{renderGrid()}</PhotoProvider>
    </div>
  );
}



//!SECTION
import { useState } from "react";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import photos from "./photos";

export default function App() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <RowsPhotoAlbum photos={photos} targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}