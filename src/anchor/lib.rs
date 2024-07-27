use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("64MeomifRYHsxgbAi5R5criRdYaBw8NyTUULzr7hN2cE"); 
//authority GeTHGKMyKwcr5LWqM645uC4pZLEBhAfm4QGw9o5RSBjk

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.account;
        account.data = 0;
        account.bump = ctx.bumps.account;
        Ok(())
    }

    pub fn pay_self(ctx: Context<PaySelf>, amount: f64) -> Result<()> {
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.to.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, (amount * 1_000_000_000.0) as u64)?;

        ctx.accounts.account.data = ctx.accounts.account.data + 1;

        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        seeds = [b"ecom4"], // optional seeds for pda
        bump,             // bump seed for pda
        payer = user,
        space = 100
    )]
    pub account: Account<'info, AccountStruct>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PaySelf<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"ecom4"],
        bump = account.bump,
    )]
    pub account: Account<'info, AccountStruct>,

    pub system_program: Program<'info, System>,

    #[account(mut)]
    /// CHECK: Account info of the product owner where ownership transfers
    pub to: AccountInfo<'info>,
}

#[account]
pub struct AccountStruct {
    data: u64,
    pub bump: u8, // 1 byte
}
