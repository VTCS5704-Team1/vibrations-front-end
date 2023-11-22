import React, { useState } from 'react';

const Selector = ({ artists, songs, onCheckboxClick }) => (
  <div>
    <h3>Available Artists</h3>
    {artists.map((artist) => (
      <div className="form-check" key={artist.id}>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={`flexCheckDefault-${artist.id}`}
          onClick={() => onCheckboxClick(artist)}
        />
        <label
          className="form-check-label"
          htmlFor={`flexCheckDefault-${artist.id}`}
        >
          {artist.name}
        </label>
      </div>
    ))}
  </div>
);

const SelectedArtists = ({ selectedArtists }) => (
  <div>
    <h3>Selected Artists</h3>
    {selectedArtists.map((artist) => (
      <div key={artist.id}>{artist.name}</div>
    ))}
  </div>
);

const ArtistSelector = () => {
  const [artists, setArtists] = useState([
    { id: 1, name: 'Artist 1' },
    { id: 2, name: 'Artist 2' },
    { id: 3, name: 'Artist 3' },
    // Add more artists as needed
  ]);

  const [selectedArtists, setSelectedArtists] = useState([]);

  const handleCheckboxClick = (clickedArtist) => {
    // Check if the artist is already selected
    const isArtistSelected = selectedArtists.some(
      (artist) => artist.id === clickedArtist.id
    );

    if (isArtistSelected) {
      // If artist is selected, remove it from the selected list
      const updatedSelectedArtists = selectedArtists.filter(
        (artist) => artist.id !== clickedArtist.id
      );
      setSelectedArtists(updatedSelectedArtists);
    } else {
      // If artist is not selected, add it to the selected list
      setSelectedArtists([...selectedArtists, clickedArtist]);
    }
  };

  return (
    <div>
      <ArtistSelection artists={artists} onCheckboxClick={handleCheckboxClick} />
      <SelectedArtists selectedArtists={selectedArtists} />
    </div>
  );
};

export default ArtistSelector;