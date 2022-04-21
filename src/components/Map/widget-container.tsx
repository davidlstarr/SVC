import React from 'react';

type WidgetContProps = { visible: boolean; classNames: string; ids: string };

/**
 * Component for displaying widget container
 */
const WidgetContainer = (props: WidgetContProps) => {
  return (
    <div className={`${props.classNames} ${props.visible ? '' : 'hidden'}`}>
      <div id={props.ids} />
    </div>
  );
};

export default WidgetContainer;
