import {
  Button,
  Image,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";

import { Dog } from "../types";

const MatchModal = ({
  match,
  setMatch,
}: {
  match: Dog;
  setMatch: Function;
}) => {
  return (
    <Modal open={true} size="tiny">
      <ModalHeader>It's a Match!</ModalHeader>
      <ModalContent>
        <Image src={match.img} />
        <h2>{match.name}</h2>
        <h4>
          Age: {match.age}
          <br />
          Breed: {match.breed}
          <br />
          Zipcode: {match.zip_code}
        </h4>
      </ModalContent>
      <ModalActions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button secondary onClick={() => setMatch()}>
          Close
        </Button>
        <Button primary>CTA HERE</Button>
      </ModalActions>
    </Modal>
  );
};

export { MatchModal };
