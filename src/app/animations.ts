import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const routerAnimation = trigger('routerAnimations', [
  transition('productList => productForm', slideTo('right')),
  transition('productForm => productList', slideTo('left')),

  transition('posDashboard => posCheckout', slideTo('left')),
  transition('posCheckout => *', slideTo('right')),
  transition('posDashboard => posPriceCheck', slideTo('right')),
  transition('posPriceCheck => *', slideTo('left')),

  transition('invoiceList => invoiceDetail', slideTo('right')),
  transition('invoiceDetail => invoiceList', slideTo('left')),

  transition('* => posDashboard', fade()),
  transition('* => posCheckout', fade()),
  transition('* => posPriceCheck', fade()),
  transition('* => productList', fade()),
  transition('* => authProfile', fade()),
  transition('* => authLogin', fade()),
  transition('* => invoiceList', fade()),
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

function fade(): any[] {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ opacity: 0 })
    ], optional),
    query(':leave', [
      style({ opacity: 1 })
    ], optional),
    group([
      query(':leave', [
        animate('600ms ease-in-out', style({ opacity: 0 }))
      ], optional),
      query(':enter', [
        animate('600ms ease-in-out', style({ opacity: 1 }))
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
