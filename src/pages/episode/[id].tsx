import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

type Episode = {
  id: string;
  name: string;
  air_date: string;
  characters: {
    id: string;
    name: string;
  }[];
};

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      characters {
        id
        name
      }
    }
  }
`;

const EpisodePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(GET_EPISODE, {
    variables: { id },
    skip: !id,
  });

  const episode: Episode | undefined = data?.episode;

  if (!episode) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{episode.name}</h1>
      <p>Fecha de emisión: {episode.air_date}</p>
      <ul>
        {episode.characters.map((character) => (
          <li key={character.id}>
            <Link href={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EpisodePage;
