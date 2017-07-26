import React from 'react';
import { PlainInput, Fork, SelectColors, ConfirmColors } from '../WizardItems';

import createWizard from '../../../src/';
const Wizard = createWizard(WizardItemRender);

//generic wizard item render
function WizardItemRender(props) {
  const { id, title, description, children, hasPrevious, hasNext, isLast, onNextClicked, onPreviousClicked, reset, errors, completed, step, onComplete } = props;
  
  return (
    <div>
      <h3>{title}</h3>
      <h4>Step {step}.</h4>
      <h4>{description}</h4>
      { children }
      <br />
      { errors ? <div><br /><span>Validation fail: {errors}</span><br /></div> : <div /> }
      <br />
      <button className="reset" onClick={reset}>Reset</button>
      <br />
      <div>
        { 
          hasPrevious ? 
            <button className="prev" onClick={onPreviousClicked} style={{float: 'left'}}>Previous</button>
            :
              <div />
         }
         {
           hasNext ?
            <button className="next" onClick={onNextClicked} style={{float: 'right'}}>Next</button>
            :
              <button className="complete" onClick={onComplete} style={{float: 'right'}}>Send</button>
        }
      </div>
    </div>
  );
}

export function WizardExample3 (props) {
  return (
    <Wizard
      onComplete={values => { alert(`Wizard complete: \n ${JSON.stringify(values)}`); }}
      {...props}
      >
        <Fork
          id='fork'
          title='Choose a path'
          description='Select colors or skip to finish?'
          validate={value => { 
            if (!value) 
              throw 'You must select one'; 
          }}
          initialValue=''
          next={value => value === 'finish' ? 'confirm' : 'colors'}
        />
        <SelectColors
          id='colors'
          title='Colors'
          initialValue={[]}
          description='Select your favorite colors'
          validate={values => { if (!values.length > 0) { throw 'Select at least one'; }}}
        />
        <ConfirmColors
          id='confirm'
          title='Confirmation'
          description='Please confirm'
          initialValue=''
        />
      </Wizard>
  );
}
