import styled from 'styled-components/macro';
import { Button } from 'components';
import { DefiFormFeedback, DefiFormFields, DefiFormValidationResult } from 'alt-model/defi/defi_form';
import {
  AmountSection,
  DescriptionSection,
  GasSection,
  GasSectionType,
  StatsSection,
} from 'views/account/dashboard/modals/sections';
import { DefiRecipe } from 'alt-model/defi/types';
import { DefiSettlementTime } from '@aztec/sdk';
import { FaqHint, Hyperlink, HyperlinkIcon } from 'ui-components';
import { SplitSection } from '../sections/split_section';
import { SettlementTimeInformationSection } from '../sections/settlement_time_information_section';
import defiBridgeImage from 'images/defi_bridge.svg';
import style from './page1.module.scss';
import { PrivacyInformationSection } from '../sections/privacy_information_section';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  gap: 30px;
  grid-template-columns: 1fr 1fr;
  max-height: calc(100vh - 100px);
  padding: 20px 40px;
  overflow: auto;
`;

interface Page1Props {
  recipe: DefiRecipe;
  fields: DefiFormFields;
  validationResult: DefiFormValidationResult;
  feedback: DefiFormFeedback;
  onChangeAmountStr: (value: string) => void;
  onChangeSpeed: (value: DefiSettlementTime) => void;
  onNext: () => void;
}

export function Page1({
  recipe,
  fields,
  validationResult,
  feedback,
  onChangeAmountStr,
  onChangeSpeed,
  onNext,
}: Page1Props) {
  return (
    <Root>
      <div className={style.descriptionWrapper}>
        <DescriptionSection text={recipe.longDescription} />
        <img src={defiBridgeImage} />
      </div>
      <div className={style.statsWrapper}>
        <StatsSection recipe={recipe} />
        <div className={style.links}>
          <Hyperlink label={'View Contract'} icon={HyperlinkIcon.Open} />
          <Hyperlink label={'View Website'} icon={HyperlinkIcon.Open} />
        </div>
      </div>
      <SplitSection
        leftPanel={
          <>
            <AmountSection
              maxAmount={validationResult.maxOutput ?? 0n}
              asset={recipe.inputAssetA}
              amountStr={fields.amountStr}
              onChangeAmountStr={onChangeAmountStr}
              message={feedback.amount}
              balanceType="L2"
            />
          </>
        }
        rightPanel={<PrivacyInformationSection />}
      />
      <SplitSection
        leftPanel={
          <GasSection
            asset={recipe.inputAssetA}
            balanceType="L2"
            type={GasSectionType.DEFI}
            speed={fields.speed as DefiSettlementTime}
            onChangeSpeed={speed => onChangeSpeed(speed as DefiSettlementTime)}
            recipe={recipe}
          />
        }
        rightPanel={<SettlementTimeInformationSection />}
      />
      <div className={style.footer}>
        <FaqHint className={style.faqHint} />
        <Button text="Next" onClick={onNext} disabled={!validationResult.isValid} />
      </div>
    </Root>
  );
}
