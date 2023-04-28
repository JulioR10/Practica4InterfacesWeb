import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "@apollo/client";
import getClient from "@/lib/apolloClient";
import Link from "next/link";

type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: any;
  location: any;
};

const CharacterPage: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Type: {character.type}</p>
      <p>Gender: {character.gender}</p>
      <a>Location: </a>
      <Link href={`/location/${character.location.id}`}>
        {character.location.name}
        <br />
      </Link>
      <br />
      Episodes:
      <br />
      {character.episode.map((episode: any) => (
        <Link key={character.episode.id} href={`/episode/${episode.id}`}>
          {episode.name}
          <br />
        </Link>
      ))}
    </div>
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
          status
          species
          type
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

export default CharacterPage;
