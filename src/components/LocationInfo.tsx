import React from "react";
import Link from "next/link";
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

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ResidentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResidentItem = styled.li`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LocationInfo: React.FC<{
  location: {
    id: string;
    name: string;
    dimension: string;
    residents: Character[];
  };
}> = ({ location }) => {
  return (
    <LocationContainer>
      <h1>{location.name}</h1>
      <p>Dimension: {location.dimension}</p>
      <ResidentList>
        {location.residents.map((resident: any) => (
          <ResidentItem key={resident.id}>
            <Link key={resident.id} href={`/character/${resident.id}`}>
              {resident.name}
              <br />
            </Link>
          </ResidentItem>
        ))}
      </ResidentList>
      ,
    </LocationContainer>
  );
};

export default LocationInfo;
