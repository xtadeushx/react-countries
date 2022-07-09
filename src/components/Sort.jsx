import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
import clsx from 'clsx';
const Sort = ({onChangeSortValue}) => {
  const [isShow, setIsShow] = useState(false);
  const [sortName, setSortName] = useState({ label: 'alphabet (A-Z)', value: 'alphabetUp' });
  const sortRef = useRef();
  const options = [
    { label: 'population (A-Z)', value: 'populationUp' },
    { label: 'population (Z-A)', value: 'populationDown' },
    { label: 'alphabet (A-Z)', value: 'alphabetUp' },
    { label: 'alphabet (Z-A)', value: 'alphabetDown' },
    { label: 'capital (A-Z)', value: 'capitalUp' },
    { label: 'capital (Z-A)', value: 'capitalDown' },
  ];
  const handleToggleVisible = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(sortRef.current)) {
        setIsShow(false);
       // console.log('click outside');
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            //console.log('click');
            handleToggleVisible();
          }}>
         { sortName.label}
        </span>
      </div>
      <div className=  {clsx(!isShow ? 'hide' : '',"sort__popup")}>
        <ul>
          {options.map((item, index) => (
            <li key={Date.now() + '-' + index} onClick={()=>{
              setSortName(item)
              onChangeSortValue(item.value)
            
            }}>{item.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Sort };
