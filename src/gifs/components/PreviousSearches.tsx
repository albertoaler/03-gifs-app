interface Props {
  title: string,
  searches: string[],
  onLabelClicked: (term: string) => void;
}

// Doing () => callback(arg) inside the render will create a function every tume the component renders
// This affects performance with a list of thousands of elements, but here is only an example
export const PreviousSearches = ({ title, searches, onLabelClicked }: Props) => {
  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {
          searches.map((term) => (
            // We use an arrow function because we need to pass a specific argument ('term')
            // instead of the Event object that onClick would normally pass by default.
            // because if we use the reference it would be treated as:
            // (event) => onLabelClicked(event)
            <li id={term} onClick={() => onLabelClicked(term)}>
              {term}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
