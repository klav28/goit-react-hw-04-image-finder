import StyledButton from './Button.component';
import PropTypes from 'prop-types';

export const Button = ({ children, onLoadMore }) => {
  return (
    <StyledButton.Container>
      <StyledButton type="button" onClick={onLoadMore}>
        {children}
      </StyledButton>
    </StyledButton.Container>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
