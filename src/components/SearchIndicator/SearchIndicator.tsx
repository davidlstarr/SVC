interface Props {
  searchValue: string;
  handleSearchIndicators: (value: any) => void;
}
const SearchIndicator = ({ searchValue, handleSearchIndicators }: Props) => {
  return (
    <div className='search-datasets'>
      <label htmlFor='searchDataset'>
        <input
          type='text'
          id='searchDataset'
          name='searchDataset'
          value={searchValue}
          placeholder='Enter keyword to search'
          onChange={handleSearchIndicators}
        />
      </label>
    </div>
  );
};

export default SearchIndicator;
