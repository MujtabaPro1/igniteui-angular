import { IPositionStrategy } from './IPositionStrategy';
import { PositionSettings, Point, HorizontalAlignment, VerticalAlignment, getPointFromPositionsSettings } from './../utilities';
import { scaleInVerTop, scaleOutVerTop } from '../../../animations/main';

export class ConnectedPositioningStrategy implements IPositionStrategy {
  private _defaultSettings: PositionSettings = {
    // default Point(0, 0) in getPointFromPositionsSettings
    target: null,
    horizontalDirection: HorizontalAlignment.Right,
    verticalDirection: VerticalAlignment.Bottom,
    horizontalStartPoint: HorizontalAlignment.Left,
    verticalStartPoint: VerticalAlignment.Bottom,
    openAnimation: scaleInVerTop,
    closeAnimation: scaleOutVerTop
  };

  public settings: PositionSettings;
  constructor(settings?: PositionSettings) {
    this.settings = Object.assign({}, this._defaultSettings, settings);
  }

  // we no longer use the element inside the position() as its dimensions are cached in rect
  position(contentElement: HTMLElement, size: { width: number, height: number}, document?: Document, initialCall?: boolean): void {
    const startPoint = getPointFromPositionsSettings(this.settings, contentElement.parentElement);

       let transformString = '';
       transformString += `translateX(${startPoint.x + this.settings.horizontalDirection * size.width}px) `;
       transformString += `translateY(${startPoint.y + this.settings.verticalDirection * size.height}px)`;
       contentElement.style.transform = transformString.trim();
  }
}

