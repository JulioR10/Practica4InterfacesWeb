import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "@apollo/client";
import getClient from "@/lib/apolloClient";
import Link from "next/link";
import styled from "styled-components";

type Character = {
  id: string;
  name: string;
  gender: string;
  image: string;
  episode: any;
  location: any;
};

const CharacterPage: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <CharacterContainer>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <a>Location: </a>
      <Link href={`/location/${character.location.id}`}>
        {character.location.name}
        <br />
      </Link>
      <p>Gender: {character.gender}</p>
      Episodes:
      <br />
      {character.episode.map((episode: any) => (
        <Link key={character.episode.id} href={`/episode/${episode.id}`}>
          {episode.name}
          <br />
        </Link>
      ))}
    </CharacterContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: gql`
      query GetCharacters {
        characters {
          results {
            id
          }
        }
      }
    `,
  });

  const paths = data.characters.results.map((character: Character) => ({
    params: { id: character.id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient();

  const { data } = await client.query({
    query: gql`
      query GetCharacter($id: ID!) {
        character(id: $id) {
          id
          name
          gender
          image
          location {
            id
            name
          }
          episode {
            id
            name
          }
        }
      }
    `,
    variables: {
      id: params?.id,
    },
  });

  return {
    props: {
      character: data.character,
    },
    revalidate: 60,
  };
};

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export default CharacterPage;
