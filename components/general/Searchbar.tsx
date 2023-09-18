export default function Searchbar({ handleSearchInput, list }: any) {
  return (
    <form className="storageForm">
      <input
        type="text"
        name="storageSearchbar"
        placeholder="search..."
        className="searchbar"
        autoComplete="off"
        onChange={(e) => handleSearchInput(e, list)}
      />
    </form>
  );
}
