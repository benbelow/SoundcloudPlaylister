import _ from 'lodash';

const markdownLinkRegex = /(?:__|[*#])|\[(.*?)\]\(.*?\)/g;
const markdownLinkWithSpaceRegex = /(?:__|[*#])|\[(.*?)\] \(.*?\)/g;
const themedRegex = /(\[|\()Themed(]|\))/ig;
const notThemedRegex = /(\[|\()Not Themed(]|\))/ig;

const openingBracketsRegex = /^\s+\(([^)]+)\)/g;
const openingSquareBracketsRegex = /^\s+\[([^)]+)]/g;

export default class Formatter {
  constructor(comment) {
    this.comment = comment;
    this.formattedComment = comment;
  }

  fixMarkdownLinkWithSpace() {
    if (this.formattedComment.match(markdownLinkWithSpaceRegex) != null) {
      this.formattedComment = this.formattedComment
        .replace(/] \(/, "](");
    }
    return this;
  }

  stripLink() {
    this.formattedComment = this.formattedComment
      .replace(markdownLinkRegex, "")
      .replace(markdownLinkWithSpaceRegex, "");
    return this;
  }

  stripThemedFlag() {
    this.formattedComment = this.formattedComment
      .replace(themedRegex, "")
      .replace(notThemedRegex, "");
    return this;
  }

// This actually trims an matched set of parens or square brackets, and only if they are at the start of the string
// This should be the case for songaweek comments, provided the link and theme flag have been stripped already
  stripGenre() {
    this.formattedComment = this.formattedComment
      .replace(openingBracketsRegex, "")
      .replace(openingSquareBracketsRegex, "");
    return this;
  }

  format() {
    const value = _.clone(this.formattedComment);
    this.formattedComment = this.comment;
    return value;
  }

  link() {
    let fixedComment = this.fixMarkdownLinkWithSpace().format();
    let linkMatch = fixedComment.match(markdownLinkRegex);
    return linkMatch ? linkMatch[0] : undefined;
  }

  description() {
    return this.stripLink().stripThemedFlag().stripGenre().format();
  }

  genre() {
    const strippedComment = this.stripLink().stripThemedFlag().format();
    let hasParensGenre = openingBracketsRegex.test(strippedComment);
    let hasSquareBracketGenre = openingBracketsRegex.test(strippedComment);
    if (!hasParensGenre && !hasSquareBracketGenre) {
      return undefined;
    }
    const bracketRegex = hasParensGenre ? openingBracketsRegex : openingSquareBracketsRegex;
    const innerRegex = hasParensGenre ? /\((.*?)\)/ : /\[(.*?)]/;
    return _.first(strippedComment.match(bracketRegex)).match(innerRegex)[1];
  }

  themed() {
    return themedRegex.test(this.comment);
  }
}