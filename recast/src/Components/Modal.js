import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({isShowing, hide, handleSearchSubmit, search, handleSearchChange,actors, handleRecastInstSubmit}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className='modal-overlay'/>
        <div className='modal-wrapper' aria-modal aria-hidden tabIndex={-1} role='dialog'>
            <div className='modal'>
                <div className='modal-header'>
                    <button type='button' className='modal-close-button' data-dismiss='modal' aria-label='Close' onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <form name='search' onSubmit={handleSearchSubmit}>    
                    <input
                        className='input'
                        type='text'
                        name='search'
                        ref={search}

                        placeholder='Search'

                        onChange={handleSearchChange}
                    />
                    <button
                        className='button'
                        type='submit'
                        name='submit'>
                        Search
                    </button>
                </form> 
                {actors?.results.map(result => {
                    return (
                        <div key={result.id} className='result'>
                            <li onClick={handleRecastInstSubmit(result)}>{result.name}</li>
                        </div>
                    )
                })}
            </div>
        </div>
    </React.Fragment>, document.body
) : null

export default Modal;