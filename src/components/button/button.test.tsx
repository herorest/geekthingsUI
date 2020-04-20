import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Button from './button';

const defaultProps = {
    onClick: jest.fn(),
    type: 'primary'
}

const disabledProps = {
    onClick: jest.fn(),
    type: 'primary'
}

describe('test Button', () => {
    it('should render danger when have danger prop', () => {
        const dom = render(<Button danger>click</Button>);
        const item = dom.getByText('click');
        expect(item).toBeInTheDocument();
        expect(item).toHaveClass('danger');
    });

    it('should click when fire a click event', () => {
        const dom = render(<Button {...defaultProps}>click</Button>);
        const item = dom.getByText('click');
        fireEvent.click(item);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should show link type', () => {
        const dom = render(<Button type="link">click</Button>);
        const item = dom.getByText('click');
        expect(item).toHaveClass('btn-link');
    });

    it('cannot be clicked', () => {
        const dom = render(<Button disabled {...disabledProps}>click</Button>);
        const item = dom.getByText('click');
        fireEvent.click(item);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})