import React from "react";
import Link from "next/link";
import styles from "../styles/CharacterList.module.css";
import styled from "styled-components";

type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const StyledCharacter = styled.div`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 150px;
  max-height: 150px;
`;

const CharacterList: React.FC<{ characters: Character[] }> = ({
  characters,
}) => {
  return (
    <Container>
      {characters.map((character) => (
        <Link key={character.id} href={`/character/${character.id}`} passHref>
          <StyledCharacter>
            <StyledImage src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </StyledCharacter>
        </Link>
      ))}
    </Container>
  );
};

export default CharacterList;
