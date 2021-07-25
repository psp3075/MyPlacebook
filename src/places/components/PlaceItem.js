import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";

function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function openMap() {
    setShowMap(true);
  }

  function closeMap() {
    setShowMap(false);
  }

  function showDelete() {
    setShowConfirmModal(true);
  }

  function cancelDelete() {
    setShowConfirmModal(false);
  }

  function confirmDelete() {
    setShowConfirmModal(false);
    console.log("Deleting");
  }
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDelete}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDelete}>
              Cancel
            </Button>
            <Button danger onClick={confirmDelete}>
              {" "}
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be retrieved back
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              View on Map
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDelete}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
