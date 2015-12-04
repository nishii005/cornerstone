import $ from 'jquery';
import foundation from './foundation';
import 'foundation/js/foundation/foundation';
import 'foundation/js/foundation/foundation.dropdown';
import 'foundation/js/foundation/foundation.reveal';
import utils from 'bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';

export default function(context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, {template: 'products/quick-view'}, function done(err, response) {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');
            foundation(modal.$content);

            return new ProductDetails(modal.$content, context);
        });
    });
}
