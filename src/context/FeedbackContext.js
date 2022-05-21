import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// create context
const FeedbackContext = createContext();

// create provider
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback Item 1',
      rating: 6,
    },
    {
      id: 2,
      text: 'This is feedback Item 2',
      rating: 10,
    },
    {
      id: 3,
      text: 'This is feedback Item 3',
      rating: 3,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  /**
   * To use these functions in a component pass it to the provider value
   */

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    // get the previous array elements (feebacks) and add new one
    setFeedback([newFeedback, ...feedback]);
  };

  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // update feedback
  const updateFeedback = (id, newUpdatedItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...newUpdatedItem } : item
      )
    );
  };

  // edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
