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
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { Typography, Grid, TextField } = window.MaterialUI.Core;
    const min = parseInt(useText(minValue), 10) || 0;
    const max = parseInt(useText(maxValue), 10) || 100;
    const parseDefaultValue =
      parseInt(useText(defaultValue), 10) || (env === 'dev' ? 50 : 0);

    const [currentValue, setCurrentValue] = useState(parseDefaultValue);

    const inputRef = React.createRef(null);

    const [showNumberField, setShowNumberField] = useState(true);

    const handleWindowResize = () => {
      if (window.innerWidth <= 600) {
        setShowNumberField(false);
      } else {
        setShowNumberField(true);
      }
    };
    useEffect(() => {
      window.addEventListener('resize', handleWindowResize);

      return () => window.removeEventListener('resize', handleWindowResize);
    }, [window.innerWidth]);

    useEffect(() => {
      if (!inputRef.current || isDev) return;
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
    }, [currentValue]);

    const handleSetValue = (value) => {
      const stringValue = value.toString();
      if (!/[0-9]/g.test(stringValue)) {
        return;
      }
      if (value > 100) {
        setCurrentValue(100);
      } else if (value < 0) {
        setCurrentValue(0);
      } else {
        setCurrentValue(value);
      }
    };

    const handleSliderBlur = (event) => {
      const { value } = event.target;
      handleSetValue(value);
    };

    const handleSliderChange = (event) => {
      const { value } = event.target;
      handleSetValue(value);
    };

    const handleInputChange = (event) => {
      const { value } = event.target;
      handleSetValue(value);
    };

    const handleInputBlur = (event) => {
      const { value } = event.target;
      handleSetValue(value);
    };

    return (
      <div className={classes.root}>
        <input type="hidden" value={currentValue} name={actionVariableId} />
        {showLabel && <Typography variant={labelSize}>{label}</Typography>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} xl={10}>
            <div className={classes.field}>
              {showMinMaxValue && <p>{min}</p>}
              <input
                className={[classes.input, 'slider-progress'].join(' ')}
                type="range"
                min={min}
                max={max}
                value={currentValue}
                step={1}
                onChange={handleSliderChange}
                onBlur={handleSliderBlur}
                ref={inputRef}
              />
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
