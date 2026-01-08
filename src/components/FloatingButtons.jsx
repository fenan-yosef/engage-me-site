import React from 'react';

function FloatingButtons() {
  return (
    <div className="floating-buttons" aria-live="polite">
      <button type="button" className="floating-button">Contact</button>
      <button type="button" className="floating-button">Help</button>
    </div>
  );
}

export default FloatingButtons;
