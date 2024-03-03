import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import {
  SongCover,
  ArtistContainer,
  CoverArtistTitle,
  SongName,
  OriginalArtistName,
  VideoInfo,
  SameLine,
  BigContainer,
  SongAndSingerContainer,
  LikedCoverButton,
} from "./CoverPage.styles";
import shareSvg from "../../assets/svgs/share.svg";
import likeSvg from "../../assets/svgs/thumps-up.svg";
import likedSvg from "../../assets/svgs/thumbs-up-liked.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddViewMutation,
  useGetCoverSongByIdQuery,
  useToggleLikeMutation,
} from "../../api/viewsAndLikesApi";
import { useGetSongByIdQuery } from "../../api/addCoverToSongApi";
import CoverPageYoutube from "../../components/CoverPageYoutube/CoverPageYoutube";
import { useSelector } from "react-redux";

export default function CoverPage() {
  const { state: coverData } = useLocation();
  const [addView] = useAddViewMutation();
  const [toggleLike] = useToggleLikeMutation();
  const { data: updatedCoverSong } = useGetCoverSongByIdQuery(coverData?._id);
  const { refetch } = useGetSongByIdQuery(updatedCoverSong?.originalSongId);
  const [playVideoDiv, setPlayVideoDiv] = useState(false);
  const [likedVideo, setLikedVideo] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // console.log(currentUser);
  // console.log(coverData);

  const goBackToOriginalSong = () => {
    // console.log({
    //   artist: coverData?.originalArtist,
    //   song: coverData?.originalSongName,
    //   coverArt: coverData?.originalSongCover,
    // });

    navigate("/translating", {
      state: {
        artist: coverData?.originalArtist,
        song: coverData?.originalSongName,
        coverArt: coverData?.originalSongCover,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [updatedCoverSong]);

  function updateViews() {
    addView(coverData?._id);
    setPlayVideoDiv(true);
  }

  function updateLikes() {
    toggleLike(coverData?._id);
  }

  useEffect(() => {
    if (updatedCoverSong?.likes.includes(currentUser.id)) {
      setLikedVideo(true);
    } else {
      setLikedVideo(false);
    }
  }, [updatedCoverSong]);

  return (
    <main>
      <Header />
      <CoverArtistTitle>Cover by {coverData?.coverArtistName}</CoverArtistTitle>

      <BigContainer>
        <ArtistContainer>
          <div>
            <SongCover
              onClick={goBackToOriginalSong}
              src={coverData?.originalSongCover}
              alt="Original song cover"
            />
          </div>

          <SongAndSingerContainer onClick={goBackToOriginalSong}>
            <SongName>{coverData?.originalSongName}</SongName>
            <OriginalArtistName>{coverData?.originalArtist}</OriginalArtistName>
          </SongAndSingerContainer>
        </ArtistContainer>

        <div>
          <CoverPageYoutube
            youtubeUrl={coverData?.youtubeUrl}
            handleAddView={updateViews}
            playVideoDiv={playVideoDiv}
          />
          <VideoInfo>
            <SameLine>
              <img src={shareSvg} alt="share svg" />
              <p>Share</p>
            </SameLine>
            <p>{updatedCoverSong?.views} views</p>
            <SameLine>
              <p className="likes">{updatedCoverSong?.likes.length} Likes </p>
              <div onClick={updateLikes}>
                {likedVideo ? (
                  <LikedCoverButton
                    $likedCover={likedVideo}
                    src={likedSvg}
                    alt="like svg"
                  />
                ) : (
                  <LikedCoverButton
                    $likedCover={likedVideo}
                    src={likeSvg}
                    alt="like svg"
                  />
                )}
                {/* <LikedCoverButton
                  $likedCover={likedVideo}
                  src={likeSvg}
                  alt="like svg"
                /> */}
              </div>
            </SameLine>
          </VideoInfo>
        </div>
      </BigContainer>
    </main>
  );
}
