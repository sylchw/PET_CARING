import React from "react";
import Service from "./Service";
import Paper from "../paper/Paper";
import { Typography } from "@material-ui/core";

const ServiceList = ({ serviceListings }) => {
  const renderList = () => {
    return (
      <div style={{ margin: 10}}>
        {serviceListings.map((item, index) => (
          <Service key={index} item={item} />
        ))}
      </div>
    );
  };
  const renderNon = () => {
    return <Typography>No Service Listing Found :{"<"}</Typography>;
  };

  return (
    <Paper style={{ minHeight: 700 }}>
      <Typography variant="h6">Services Listings</Typography>
      {serviceListings && serviceListings.length > 0
        ? renderList()
        : renderNon()}
    </Paper>
  );
};

export default ServiceList;
