(() => ({
  name: 'Slider',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId,
      defaultValue,
      showMinMaxValue,
      minValue,
      maxValue,
      label,
      labelSize,
      showLabel,
      showInputField,
      stepSize,
      thumbWidth,
      thumbBorderHeight,
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { Typography, Grid, TextField, Tooltip } = window.MaterialUI.Core;
    const min = parseInt(useText(minValue), 10) || 0;
    const max = parseInt(useText(maxValue), 10) || 100;
    const parseDefaultValue =
      parseInt(useText(defaultValue), 10) || (env === 'dev' ? 50 : 0);

    const [currentValue, setCurrentValue] = useState(parseDefaultValue);
    const [showNumberField, setShowNumberField] = useState(showInputField);
    const inputRef = React.createRef(null);
    const [trackWidthPx, setTrackWidthPx] = useState(0);
    const thumbWidthPx = parseInt(thumbWidth, 10) || 16;
    const thumbBorderHeightPx = parseInt(thumbBorderHeight, 10) || 0;
    const [tooltipPosition, setTooltipPosition] = useState(0);

    const calculateTooltipPosition = (value, trackWidth) => {
      if (trackWidth === 0) return 0;
      const range = max - min;
      const ratio = (value - min) / range;

      const thumbSize = thumbWidthPx + 2 * thumbBorderHeightPx;
      const thumbCenterPx = ratio * (trackWidth - thumbSize) + thumbSize / 2;

      const percentagePosition = (thumbCenterPx / trackWidth) * 100;
      return percentagePosition;
    };

    const handleWindowResize = () => {
      if (window.innerWidth <= 600) {
        setShowNumberField(false);
      } else {
        setShowNumberField(showInputField);
      }

      if (inputRef.current) {
        setTrackWidthPx(inputRef.current.offsetWidth);
      }
    };
    useEffect(() => {
      window.addEventListener('resize', handleWindowResize);

      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    useEffect(() => {
      if (!inputRef.current || isDev) return;

      const currentTrackWidth = inputRef.current.offsetWidth;
      if (trackWidthPx !== currentTrackWidth) {
        setTrackWidthPx(currentTrackWidth);
      }

      inputRef.current.style.setProperty('--value', inputRef.current.value);
      inputRef.current.style.setProperty(
        '--min',
        inputRef.current.min === '' ? '0' : inputRef.current.min,
      );
      inputRef.current.style.setProperty(
        '--max',
        inputRef.current.max === '' ? '100' : inputRef.current.max,
      );
      inputRef.current.addEventListener('input', (e) =>
        e.currentTarget.style.setProperty('--value', e.currentTarget.value),
      );
      const newPosition = calculateTooltipPosition(
        currentValue,
        currentTrackWidth,
      );
      setTooltipPosition(newPosition);
    }, [currentValue, trackWidthPx]);

    const handleSetValue = (value) => {
      const stringValue = value.toString();
      if (!/[0-9]/g.test(stringValue)) {
        return;
      }
      setCurrentValue(value);
    };

    const handleSliderBlur = (event) => {
      const { value } = event.target;
      handleSetValue(value);
      B.triggerEvent('onBlur', value);
    };

    const handleSliderChange = (event) => {
      const { value } = event.target;
      const newValue = parseInt(value, 10);
      handleSetValue(newValue);
      setTooltipPosition(calculateTooltipPosition(newValue, trackWidthPx));
    };

    const handleInputChange = (event) => {
      const { value } = event.target;
      handleSetValue(value);
      B.triggerEvent('onChange', value);
    };

    const handleInputBlur = (event) => {
      const { value } = event.target;
      handleSetValue(value);
      B.triggerEvent('onBlur', value);
    };

    return (
      <div className={classes.root}>
        <input type="hidden" value={currentValue} name={actionVariableId} />
        {showLabel && <Typography variant={labelSize}>{label}</Typography>}
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={showNumberField ? 8 : 12}
            xl={showNumberField ? 10 : 12}
          >
            <div className={classes.field}>
              {showMinMaxValue && <p>{min}</p>}
              <div className={classes.sliderContainer}>
                <Tooltip
                  title={currentValue}
                  placement="top"
                  open={!showInputField}
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <span
                    style={{ left: `${tooltipPosition}%` }}
                    className={classes.tooltipDummy}
                  >
                    {/* Dummy span acts as the anchor for the Tooltip */}
                  </span>
                </Tooltip>
                <input
                  className={[classes.input, 'slider-progress'].join(' ')}
                  type="range"
                  min={min}
                  max={max}
                  value={currentValue}
                  step={stepSize}
                  onChange={handleSliderChange}
                  onBlur={handleSliderBlur}
                  ref={inputRef}
                />
              </div>
              {showMinMaxValue && <p>{max}</p>}
            </div>
          </Grid>
          {showNumberField && (
            <Grid item sm={4} xl={2}>
              <TextField
                variant="outlined"
                fullWidth
                disabled={isDev}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={currentValue}
              />
            </Grid>
          )}
        </Grid>
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const { Styling } = B;
    const style = new Styling(theme);
    return {
      root: {
        width: '100%',
        margin: '0.5rem 0 0.5rem 0',
      },
      sliderContainer: {
        position: 'relative',
        flexGrow: 1,
      },
      tooltipDummy: {
        position: 'absolute',
        transform: 'translateX(calc(-50% + 1px))',
        top: ({ options: { thumbBorderHeight } }) =>
          `${10 - parseInt(thumbBorderHeight, 10)}px`,
      },
      customTooltip: {
        backgroundColor: style.getColor('Black'),
        fontSize: '0.875rem',
      },
      customArrow: {
        color: style.getColor('Black'),
      },
      sliderValue: {
        position: 'relative',
        width: '100%',
      },
      field: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        height: '100%',
        position: 'relative',
      },
      value: {
        position: 'absolute',
        fontSize: '18px',
        color: 'dodgerblue',
        fontWeight: 600,
      },
      input: {
        '-webkit-appearance': 'none',
        position: 'relative',
        width: ({ options: { trackWidth } }) => trackWidth,
        height: ({ options: { trackHeight } }) => trackHeight,
        background: ({ options: { trackBackground } }) =>
          style.getColor(trackBackground),
        borderRadius: ({ options: { trackBorderRadius } }) => trackBorderRadius,
        outline: 'none',
        border: ({ options: { trackBorder, trackBorderColor } }) =>
          `${trackBorder} solid ${style.getColor(trackBorderColor)}`,
        zIndex: 2222,
        '&::-webkit-slider-thumb': {
          '-webkit-appearance': 'none',
          boxSizing: ({ options: { thumbBorderPlacement } }) =>
            thumbBorderPlacement === 'inside' ? 'border-box' : 'content-box',
          width: ({ options: { thumbWidth } }) => thumbWidth,
          height: ({ options: { thumbHeight } }) => thumbHeight,
          borderRadius: ({ options: { thumbBorderRadius } }) =>
            thumbBorderRadius,
          background: ({ options: { thumbColor } }) =>
            style.getColor(thumbColor),
          border: ({
            options: { thumbBorder, thumbBorderColor, thumbBorderHeight },
          }) =>
            thumbBorder
              ? `${thumbBorderHeight} solid ${style.getColor(thumbBorderColor)}`
              : 'none',
          cursor: 'pointer',
        },
        '&::-moz-range-thumb': {
          '-webkit-appearance': 'none',
          width: ({ options: { thumbWidth } }) => thumbWidth,
          height: ({ options: { thumbHeight } }) => thumbHeight,
          background: ({ options: { thumbColor } }) =>
            style.getColor(thumbColor),
          borderRadius: ({ options: { thumbBorderRadius } }) =>
            thumbBorderRadius,
          border: ({
            options: { showBorder, thumbBorderColor, thumbBorderHeight },
          }) =>
            showBorder
              ? `${thumbBorderHeight} solid ${style.getColor(thumbBorderColor)}`
              : 'none',
          cursor: 'pointer',
        },
        '&::-webkit-slider-runnable-track': {
          '--range': `calc(var(--max) - var(--min))`,
          '--ratio': `calc((var(--value) - var(--min)) / var(--range))`,
          '--sx': `calc(0.5 * 2em + var(--ratio) * (100% - 2em))`,
          background: ({ options: { progressColor, trackHeight } }) =>
            `linear-gradient(${style.getColor(progressColor)},${style.getColor(
              progressColor,
            )}) 0/var(--sx) ${trackHeight} no-repeat, rgb(0,0,0,0);
            `,
          overflow: 'hidden',
          borderRadius: ({ options: { trackBorderRadius } }) =>
            trackBorderRadius,
        },
      },
    };
  },
}))();
