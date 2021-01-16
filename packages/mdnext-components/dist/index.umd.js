(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(
        exports,
        require('react'),
        require('@chakra-ui/react'),
        require('use-cloudinary'),
      )
    : typeof define === 'function' && define.amd
    ? define([
        'exports',
        'react',
        '@chakra-ui/react',
        'use-cloudinary',
      ], factory)
    : ((global = global || self),
      factory(
        (global.components = {}),
        global.react,
        global.react,
        global.useCloudinary,
      ));
})(this, function (exports, React, react, useCloudinary) {
  var React__default = 'default' in React ? React['default'] : React;

  function _extends() {
    _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function CopyButton(_ref) {
    var value = _ref.value;

    var _useClipboard = react.useClipboard(value),
      onCopy = _useClipboard.onCopy,
      hasCopied = _useClipboard.hasCopied;

    return /*#__PURE__*/ React__default.createElement(
      react.Button,
      {
        'aria-label': 'Copy text',
        role: 'button',
        onClick: onCopy,
      },
      hasCopied ? 'Copied' : 'Copy',
    );
  }

  function Code(_ref2) {
    var children = _ref2.children,
      className = _ref2.className;
    var language = className.replace(/language-/, '');
    return /*#__PURE__*/ React.createElement(
      Highlight__default,
      _extends({}, Highlight.defaultProps, {
        theme: theme,
        code: children.trim(),
        language: language,
      }),
      function (_ref3) {
        var className = _ref3.className,
          style = _ref3.style,
          tokens = _ref3.tokens,
          getLineProps = _ref3.getLineProps,
          getTokenProps = _ref3.getTokenProps;
        return /*#__PURE__*/ React.createElement(
          'pre',
          {
            className: className,
            style: _extends({}, style, {
              overflow: 'scroll',
              marginTop: 20,
              marginBottom: 20,
              padding: 16,
            }),
          },
          tokens.map(function (line, i) {
            return /*#__PURE__*/ React.createElement(
              'div',
              _extends(
                {
                  key: i,
                },
                getLineProps({
                  line: line,
                  key: i,
                }),
              ),
              line.map(function (token, key) {
                return /*#__PURE__*/ React.createElement(
                  'span',
                  _extends(
                    {
                      key: key,
                    },
                    getTokenProps({
                      token: token,
                      key: key,
                    }),
                  ),
                );
              }),
            );
          }),
          /*#__PURE__*/ React.createElement(CopyButton, {
            value: children.trim(),
          }),
        );
      },
    );
  }

  function Image(_ref) {
    var src = _ref.src,
      cloudName = _ref.cloudName,
      publicId = _ref.publicId,
      transforms = _ref.transforms,
      width = _ref.width,
      height = _ref.height,
      lazy = _ref.lazy,
      props = _objectWithoutPropertiesLoose(_ref, [
        'src',
        'cloudName',
        'publicId',
        'transforms',
        'width',
        'height',
        'lazy',
      ]);

    var _useImage = useCloudinary.useImage(cloudName),
      generateImageUrl = _useImage.generateImageUrl,
      blurredPlaceholderUrl = _useImage.blurredPlaceholderUrl,
      ref = _useImage.ref,
      supportsLazyLoading = _useImage.supportsLazyLoading,
      inView = _useImage.inView; // Not using Cloudinary

    if (!publicId) {
      // Try to lazy load all images when { lazy === true }
      if (lazy) {
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            ref: !supportsLazyLoading ? ref : undefined,
            style: {
              width: width + 'px',
              height: height + 'px',
            },
          },
          inView ||
            (supportsLazyLoading &&
              /*#__PURE__*/ React__default.createElement(
                react.Image,
                _extends(
                  {
                    src: src,
                    loading: 'lazy',
                    width: '100%',
                  },
                  props,
                ),
              )),
        );
      } else {
        // Otherwise, just use the Chakra image component
        return /*#__PURE__*/ React__default.createElement(
          react.Image,
          _extends(
            {
              src: src,
            },
            props,
          ),
        );
      } // Or if you are using Cloudinary, it will move to here
    } else {
      // lazy load w/ a blurred placeholder of the image that's loading
      if (lazy) {
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            ref: !supportsLazyLoading ? ref : undefined,
            style: {
              width: width + 'px',
              height: height + 'px',
              background:
                'no-repeat url(' +
                blurredPlaceholderUrl(publicId, width, height) +
                ')',
            },
          },
          inView ||
            (supportsLazyLoading &&
              /*#__PURE__*/ React__default.createElement(
                react.Image,
                _extends(
                  {
                    src: generateImageUrl({
                      delivery: {
                        publicId: publicId,
                      },
                      transformation: _extends({}, transforms),
                    }),
                    loading: 'lazy',
                    width: '100%',
                  },
                  props,
                ),
              )),
        );
      } else {
        // Just render the image
        return /*#__PURE__*/ React__default.createElement(
          react.Image,
          _extends(
            {
              src: url,
              width: '100%',
            },
            props,
          ),
        );
      }
    }
  }

  exports.Code = Code;
  exports.Image = Image;
});
//# sourceMappingURL=index.umd.js.map
