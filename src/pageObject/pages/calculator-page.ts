import { Page } from 'playwright';
import { BasePage } from './base-page';
import { AdEstimatePopupComponent } from '../components/add-to-estimate-popup-component';
import { ConfigurationComponent } from '../components/configuration-component';
import { CostDetailsComponent } from '../components/cost-details-component';
import { DeleteNotificationComponent } from '../components/delete-notification-component';
import { DeleteGroupPopupComponent } from '../components/delete-group-popup-component';

export class CalculatorPage extends BasePage {
    addEstimatePopup: AdEstimatePopupComponent;
    configurationComponent: ConfigurationComponent;
    costDetails: CostDetailsComponent;
    deleteNotification: DeleteNotificationComponent;
    deleteGroupPopup: DeleteGroupPopupComponent;

    constructor(page: Page) {
        super(page, '/products/calculator');
        this.addEstimatePopup = new AdEstimatePopupComponent(page);
        this.configurationComponent = new ConfigurationComponent(page);
        this.costDetails = new CostDetailsComponent(page);
        this.deleteNotification = new DeleteNotificationComponent(page);
        this.deleteGroupPopup = new DeleteGroupPopupComponent(page);
    }
}
