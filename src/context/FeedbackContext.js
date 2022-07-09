import { createContext, useState, useEffect } from 'react';

// create context
const FeedbackContext = createContext();

// create provider
export const FeedbackProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(true);
   const [feedback, setFeedback] = useState([]);
   const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false,
   });

   useEffect(() => {
      fetchfeedback();
   }, []);

   // fetch feedback
   const fetchfeedback = async () => {
      const response = await fetch('/feedback?_sort=id&_order=desc');
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false);
   };

   /**
    * To use these functions in a component pass it to the provider value
    */

   // add feedback
   const addFeedback = async (newFeedback) => {
      const response = await fetch('/feedback', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newFeedback),
      });
      const data = await response.json();
      // get the previous array elements (feebacks) and add new one
      setFeedback([data, ...feedback]);
   };

   // delete feedback
   const deleteFeedback = async (id) => {
      if (window.confirm('Are you sure you want to delete?')) {
         await fetch(`/feedback/${id}`, { method: 'DELETE' });
         setFeedback(feedback.filter((item) => item.id !== id));
      }
   };

   // update feedback
   const updateFeedback = async (id, newUpdatedItem) => {
      const response = await fetch(`/feedback/${id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newUpdatedItem),
      });
      const data = await response.json();
      setFeedback(
         feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
            isLoading,
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
