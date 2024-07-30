export {};

declare global {
	interface String {
		capitalize(): string;
	}
}
// eslint-disable-next-line
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
