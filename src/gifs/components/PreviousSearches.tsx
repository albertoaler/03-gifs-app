interface Props {
  title: string,
  searches: string[];
}

export const PreviousSearches = ({ title, searches }: Props) => {
  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {
          searches.map((term) => (
            <li id={term}>{term}</li>
          ))
        }
      </ul>
    </div>
  );
};
