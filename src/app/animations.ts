import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation = trigger('routerAnimations', [
  transition('* => posCheckout', slideTo('left')),
  transition('posCheckout => *', slideTo('right'))
]);

function slideTo(direction: 'left' | 'right'): any[] {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%', opacity: 0 })
    ], optional),
    query(':leave', [
      style({ opacity: 1 })
    ], optional),
    group([
      query(':leave', [
        animate('600ms ease-in-out', style({ [direction]: '100%', opacity: 0 }))
      ], optional),
      query(':enter', [
        animate('600ms ease-in-out', style({ [direction]: '0', opacity: 1 }))
      ], optional),

      // force the inner content to be animated
      // with a real but not visible animation
      // the inner content is not removed until the animation ends
      // we use the same 200ms
      query(':leave *', [
        style({}),
        animate(1, style({}))
      ], optional)
    ])
  ];
}
