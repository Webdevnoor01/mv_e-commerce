import { useState } from 'react';

// react-redux
import { useDispatch } from 'react-redux';

// Utilities
import mapValuesToState from '../utils/mapValuesToState';
import mapStateToValues from '../utils/mapStateToValues';

const useForm = ({ formState }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({ ...mapValuesToState(formState) });

  const handleChange = (e, inputRef) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: {
        error: prevState[e.target.name].error,
        value: e.target.value,
        active:true
      },
    }));
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();
    console.log(mapStateToValues(state))
    dispatch(action(mapStateToValues(state)))
  };

  const handleClick = (e) =>{
    setState(prevState =>( {
      ...prevState,
      [e.target.name]: {
        error: prevState[e.target.name].error,
        value: prevState[e.target.name].value,
        active:true
      },
    }))
  }

  const handleBlur = (e) =>{
    console.log('handleBlur')
    setState(prevState =>( {
      ...prevState,
      [e.target.name]: {
        error: prevState[e.target.name].error,
        value: prevState[e.target.name].value,
        active:false
      },
    }))
  }
  return {
    formState: state,
    handleChange,
    handleSubmit,
    handleClick,
    handleBlur
  };
};

export default useForm;
