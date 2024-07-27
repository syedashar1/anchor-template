export type HelloAnchor = {
  version: "0.1.0";
  name: "hello_anchor";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "paySelf";
      accounts: [
        {
          name: "buyer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "account";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "f64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "AccountStruct";
      type: {
        kind: "struct";
        fields: [
          {
            name: "data";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};

export const IDL: HelloAnchor = {"version":"0.1.0","name":"hello_anchor","instructions":[{"name":"initialize","accounts":[{"name":"user","isMut":true,"isSigner":true},{"name":"account","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"paySelf","accounts":[{"name":"buyer","isMut":true,"isSigner":true},{"name":"account","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"to","isMut":true,"isSigner":false}],"args":[{"name":"amount","type":"f64"}]}],"accounts":[{"name":"AccountStruct","type":{"kind":"struct","fields":[{"name":"data","type":"u64"},{"name":"bump","type":"u8"}]}}]}
