// import { useQuery, gql } from "@apollo/client";

// const CHARACTER_QUERY = gql`
//   query Character($id: ID!) {
//     character(id: $id) {
//       name
//     }
//   }
// `;

// function Character({ id }: { id: any }) {
//   const { loading, error, data } = useQuery(CHARACTER_QUERY, {
//     variables: { id },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return <h1>{data.character.name}</h1>;
// }

// export default Character;
