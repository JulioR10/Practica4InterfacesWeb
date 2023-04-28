import { gql, useQuery } from "@apollo/client";
import CharacterList from "@/components/CharacterList";
import { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        prev
        next
      }
      results {
        id
        name
        image
      }
    }
  }
`;

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page, filter: { name: search } },
    skip: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    refetch();
  }, [page, search, refetch]);

  const characters = data?.characters?.results || [];
  const info = data?.characters?.info;

  const previousPageDisabled = page === 1 || !info?.prev;
  const nextPageDisabled = !info?.next;

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <CharacterList characters={characters} />
      <div>
        <button
          disabled={previousPageDisabled}
          onClick={() => setPage(page - 1)}
        >
          Página anterior
        </button>
        <button disabled={nextPageDisabled} onClick={() => setPage(page + 1)}>
          Siguiente página
        </button>
      </div>
    </>
  );
};

export default Index;
