import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import EpisodeInfo from "@/components/EpisodeInfo";

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

  return <EpisodeInfo episode={episode} />;
};

export default EpisodePage;
