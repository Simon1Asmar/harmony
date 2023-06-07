import {
  LyricsSection,
  LyricsWrapper,
  TranslationWrapper,
  SongTitle,
  Status,
  Paragraph,
  TranslatedParagraph,
} from "./LyricsStyles";

const Lyrics = ({ artist, title, lyrics }) => {
  return (
    <LyricsSection>
      <TranslationWrapper>
        <Status>Translation</Status>
        <SongTitle>{title.hebrew}</SongTitle>
        <TranslatedParagraph>{lyrics.hebrew}</TranslatedParagraph>
      </TranslationWrapper>
      <LyricsWrapper>
        <Status>Original</Status>
        <SongTitle>{title.arabic}</SongTitle>
        <Paragraph>{lyrics.arabic}</Paragraph>
      </LyricsWrapper>
    </LyricsSection>
  );
};

export default Lyrics;
