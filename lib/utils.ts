type ModalsState = {
  ElementsModal: bool;
}


const modalsState = {
    ElementsModal: false,
}

function modalsReducer(state, action) {
  
  switch(action.type) {
      case 'elementsOpen' : {
        return {
          ElementsModal: !state.ElementsModal,
        }
      }
      default: {
            throw Error('Unknown action: ' + action.type);
        }
      
  }

}

export { ModalsState,modalsReducer, modalsState };
