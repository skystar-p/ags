{
  description = "A customizable and extensible shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, self, flake-utils, ... }: flake-utils.lib.eachDefaultSystem
    (system:
      let
        version = builtins.replaceStrings [ "\n" ] [ "" ] (builtins.readFile ./version);
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages = {
          default = pkgs.callPackage ./nix { inherit version; };
          ags = self.packages.${system}.default;
          agsWithTypes = self.packages.${system}.default; # for backwards compatibility
          agsNoTypes = pkgs.callPackage ./nix {
            inherit version;
            buildTypes = false;
          };
        };

        devShell = pkgs.mkShell {
          name = "ags";
          buildInputs = with pkgs; [
            nodejs
            pnpm
            dprint
          ];
        };
      }) // {
    homeManagerModules = {
      default = self.homeManagerModules.ags;
      ags = import ./nix/hm-module.nix self;
    };
  };
}
