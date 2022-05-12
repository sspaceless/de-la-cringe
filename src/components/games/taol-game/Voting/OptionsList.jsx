import PropTypes from 'prop-types';

function OptionsList(props) {
  const { options, onClick } = props;
  return (
    options.map((item) => (
      <button
        key={item[0]}
        type="button"
        onClick={onClick.bind(null, item[0])}
      >
        { item['1'].answer }
      </button>
    ))
  );
}

OptionsList.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  onClick: PropTypes.func.isRequired
};

export default OptionsList;
