import styled from '@emotion/styled';
import { colors } from '../../styles/colorPalette';
import { css } from '@emotion/react';
import Flex from '../common/Flex';
import InputStepper from './InputStepper';
import Text from '../common/Text';
import Spacing from '../common/Spacing';
import { Product } from '../../models/product';
import Bedge from '../common/Bedge';
import useCartState from '../../hooks/useCartState';

interface OrderItemProps {
  product: Product;
}

function OrderItem({ product }: OrderItemProps) {
  const { quantity } = useCartState(product.id);

  return (
    <div>
      <Flex as="li" css={itemListStyles(quantity)}>
        <ProductImage />

        <Flex direction="column" justify="space-between" css={itemValueStyles}>
          <Flex align="center" css={itemNameContainerStyles}>
            <Text>{product.name}</Text>
            {product.event === 1 ? <Bedge label="이벤트" /> : null}
          </Flex>

          <Flex justify="space-between">
            <InputStepper id={product.id} />
            <Text>
              {quantity
                ? (quantity * product.price).toLocaleString('ko-KR')
                : product.price.toLocaleString('ko-KR')}
              원
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Spacing size={18} />
    </div>
  );
}

const ProductImage = styled.div`
  width: 62px;
  height: 62px;
  background-color: ${colors.grey};
`;

const itemListStyles = (quantity: number) => css`
  background-color: ${quantity > 0 ? colors.orange10 : colors.white};
  border-radius: 15px;
  border: 1px solid ${colors.grey};
  padding: 9px 12px;
  gap: 20px;
`;

const itemValueStyles = css`
  flex-grow: 1;
`;

const itemNameContainerStyles = css`
  gap: 10px;
`;

export default OrderItem;
