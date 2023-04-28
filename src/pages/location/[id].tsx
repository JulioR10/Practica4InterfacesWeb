import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import getClient from "@/lib/apolloClient";
import Link from "next/link";

type Location = {
  id: string;
  name: string;
  dimension: string;
  residents: any;
};

const GET_LOCATION = gql`
  query GET_LOCATION($id: ID!) {
    location(id: $id) {
      id
      name
      dimension
      residents {
        id
        name
      }
    }
  }
`;

const LocationPage: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <>
      <h1>{location.name}</h1>
      <p>Dimension: {location.dimension}</p>
      {location.residents.map((resident: any) => (
        <Link key={resident.id} href={`/character/${resident.id}`}>
          {resident.name}
          <br />
        </Link>
      ))}
      ,
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = getClient();

  const id = context.params?.id;

  const { data } = await client.query({
    query: GET_LOCATION,
    variables: { id },
  });

  return {
    props: {
      location: data.location,
    },
  };
};

export default LocationPage;
