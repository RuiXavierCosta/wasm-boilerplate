import Color from 'scripts/Color';

export const getElementPositions = (sections) => Object.entries(sections).map(([key, section]) => {
  const { current } = section.el;
  if(!current) {
    return {};
  }
  
  const coords = current.getBoundingClientRect();
  return { id: key, top: coords.top, bottom: coords.bottom, height: coords.height };
}, {});

const inBounds = (upper, lower, value) => upper >= value && value >= lower;

export const getIntersections = (sections, screenPosition = 0, deviation = 0) => {
  const halfDeviation = deviation / 2;

  const intersections = sections.filter(s => {
    const bounderies = { upper: s.top - halfDeviation, lower: s.bottom + halfDeviation };
    return inBounds(bounderies.lower, bounderies.upper, screenPosition);
  });

  const [first, second] = intersections.sort((a, b) => a.top > b.top);
  if(!second) return { first, second, intersection: 0};

  const intersection = (screenPosition - second.top + halfDeviation) / deviation;
  return { first, second, intersection };
};

export const getBackgroundFromIntersections = (sections, intersections) => {
  const { first, second, intersection } = intersections;
  if(!first && !second) {
    return '';
  }

  if(!second) {
    const section = sections[first.id];
    return section?.color?.css;
  }

  const firstRGB = sections[first.id]?.color.rgb;
  const secondRGB = sections[second.id]?.color.rgb;
  const r = firstRGB.r + intersection * (secondRGB.r - firstRGB.r);
  const g = firstRGB.g + intersection * (secondRGB.g - firstRGB.g);
  const b = firstRGB.b + intersection * (secondRGB.b - firstRGB.b);
  
  const gradientValue = new Color(r, g, b);
  return gradientValue.css;
};

export const getTitleFromIntersection = (sections, intersections) => {
  const { first, second } = intersections;
  if(!first && !second) {
    return '';
  }

  if(!second) {
    const section = sections[first.id];
    return section?.title;
  }

  return sections[second.id]?.title;
}

export const getElementPercentageOnScreen = (sections) => {
  return sections.map(({ id, top, bottom, height }) => {
    const b = 1 - ((height - bottom) / height);
    const t = (height - top) / height;
    const percentage = bottom > height ? t * 100 : b * 100;

    if(percentage < 0) {
      return { id, visible: false, visiblePercentage: 0 };
    }

    return {
      id,
      visible: true,
      visiblePercentage: Math.round(percentage), 
    };
  });
};