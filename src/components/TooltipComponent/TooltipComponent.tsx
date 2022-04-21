import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import './TooltipComponent.scss';
import parse from 'html-react-parser';

interface Props {
  data: any;
  fullWidth?: boolean;
}

const TooltipComponent = ({ data, fullWidth = false }: Props) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    trigger: 'click',
    placement: data.indicators ? 'left' : 'top',
    interactive: true,
  });

  return (
    <div className='more-info-icon'>
      <span ref={setTriggerRef} className='tooltip-icon'>
        <i className='ri-information-line'></i>
      </span>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: fullWidth ? 'tooltip-container full-width' : 'tooltip-container' })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {parse(data.tooltipDescription)}
        </div>
      )}
    </div>
  );
};

export default TooltipComponent;
