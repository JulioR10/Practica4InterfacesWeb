import React from "react";
import Link from "next/link";
import styled from "styled-components";

type Character = {
  id: string;
  name: string;
};

const EpisodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CharacterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CharacterItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const EpisodeInfo: React.FC<{
  episode: {
    id: string;
    name: string;
    air_date: string;
    characters: Character[];
  };
}> = ({ episode }) => {
  return (
    <EpisodeContainer>
      <h1>{episode.name}</h1>
      <p>Fecha de emisión: {episode.air_date}</p>
      <CharacterList>
        {episode.characters.map((character) => (
          <CharacterItem key={character.id}>
            <Link href={`/character/${character.id}`}>{character.name}</Link>
          </CharacterItem>
        ))}
      </CharacterList>
    </EpisodeContainer>
  );
};

export default EpisodeInfo;
