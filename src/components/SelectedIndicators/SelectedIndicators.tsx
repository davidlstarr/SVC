import { IndicatorsConfigTypes } from '../../types/layerType';

interface Props {
  selectedIndicators: IndicatorsConfigTypes[];
  step: 1 | null;
  handleRemoveDataset: (selected: IndicatorsConfigTypes, step: 1 | null) => void;
}

const SelectedIndicators = ({ selectedIndicators, step, handleRemoveDataset }: Props) => {
  return (
    <>
      <h4>Selected Datasets</h4>
      {selectedIndicators.map((selected) => (
        <div className='selected-dataset' key={selected.id}>
          <span>
            {selected.title}
            <button onClick={() => handleRemoveDataset(selected, step)}>
              <i className='ri-close-circle-line'></i>
            </button>
          </span>
        </div>
      ))}
    </>
  );
};

export default SelectedIndicators;
